import type {
  DataProvider,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams,
  RaRecord,
  Identifier,
} from "react-admin";

const BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

if (!BASE_URL) {
  throw new Error(
    "VITE_API_URL est manquant dans les variables d'environnement.",
  );
}

// ─── Fetch de base avec JWT ───────────────────────────────────────────────────
async function httpClient(
  url: string,
  options: RequestInit = {},
): Promise<unknown> {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  // DELETE peut renvoyer 204 sans body
  if (res.status === 204) return {};

  const json: unknown = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      typeof json === "object" && json !== null && "error" in json
        ? String((json as Record<string, unknown>).error)
        : `Erreur HTTP ${res.status}`;
    throw new Error(message);
  }

  return json;
}

// ─── Resource → path ──────────────────────────────────────────────────────────
const resourcePath: Record<string, string> = {
  events: "/api/events",
  sessions: "/api/sessions",
  speakers: "/api/speakers",
  rooms: "/api/rooms",
};

function getPath(resource: string): string {
  const path = resourcePath[resource];
  if (!path) throw new Error(`Resource inconnue : "${resource}"`);
  return `${BASE_URL}${path}`;
}

// ─── Helpers de cast ──────────────────────────────────────────────────────────
type LooseRecord = RaRecord & Record<string, unknown>;

function toRaRecord(json: unknown): LooseRecord {
  if (typeof json === "object" && json !== null && "id" in json) {
    const record = json as Record<string, unknown>;
    return { ...record, id: record.id as Identifier } as LooseRecord;
  }
  throw new Error("Réponse inattendue : l'objet doit avoir un champ `id`.");
}

function toRaRecordArray(json: unknown): LooseRecord[] {
  if (!Array.isArray(json)) return [];
  return json.map(toRaRecord);
}

// ─── Sérialisation sessions (formulaire → body API) ───────────────────────────
// Le formulaire React Admin envoie { eventId, roomId, speakerId, ... }
// On nettoie et on transmet tel quel au backend.
function serializeSession(
  data: Record<string, unknown>,
): Record<string, unknown> {
  return {
    title: data.title,
    description: data.description ?? null,
    startTime: data.startTime,
    endTime: data.endTime,
    eventId: data.eventId,
    roomId: data.roomId,
    speakerId: data.speakerId ?? null,
  };
}

// ─── Data Provider ────────────────────────────────────────────────────────────
const provider = {
  async getList(_resource: string, params: GetListParams) {
    const { filter = {} } = params;

    const qs = new URLSearchParams();
    Object.entries(filter as Record<string, unknown>).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    });

    const query = qs.toString() ? `?${qs.toString()}` : "";
    const json = await httpClient(`${getPath(_resource)}${query}`);
    const data = toRaRecordArray(json);

    return { data, total: data.length };
  },

  async getOne(_resource: string, params: GetOneParams) {
    const json = await httpClient(`${getPath(_resource)}/${params.id}`);
    return { data: toRaRecord(json) };
  },

  async getMany(_resource: string, params: GetManyParams) {
    const data = await Promise.all(
      params.ids.map((id) =>
        httpClient(`${getPath(_resource)}/${id}`).then(toRaRecord),
      ),
    );
    return { data };
  },

  async getManyReference(_resource: string, params: GetManyReferenceParams) {
    const { target, id, filter = {} } = params;
    const qs = new URLSearchParams({
      ...(filter as Record<string, string>),
      [target]: String(id),
    });
    const json = await httpClient(`${getPath(_resource)}?${qs.toString()}`);
    const data = toRaRecordArray(json);
    return { data, total: data.length };
  },

  async create(_resource: string, params: CreateParams) {
    const body =
      _resource === "sessions"
        ? serializeSession(params.data as Record<string, unknown>)
        : params.data;

    const json = await httpClient(getPath(_resource), {
      method: "POST",
      body: JSON.stringify(body),
    });
    return { data: toRaRecord(json) };
  },

  async update(_resource: string, params: UpdateParams) {
    const body =
      _resource === "sessions"
        ? serializeSession(params.data as Record<string, unknown>)
        : params.data;

    const json = await httpClient(`${getPath(_resource)}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return { data: toRaRecord(json) };
  },

  async updateMany(_resource: string, params: UpdateManyParams) {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${getPath(_resource)}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }),
      ),
    );
    return { data: params.ids };
  },

  async delete(_resource: string, params: DeleteParams) {
    await httpClient(`${getPath(_resource)}/${params.id}`, {
      method: "DELETE",
    });
    return { data: { id: params.id } as LooseRecord };
  },

  async deleteMany(_resource: string, params: DeleteManyParams) {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${getPath(_resource)}/${id}`, { method: "DELETE" }),
      ),
    );
    return { data: params.ids };
  },
};

export const dataProvider = provider as DataProvider;
