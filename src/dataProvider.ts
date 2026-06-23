const API_URL = "http://localhost:3000/api";

const dataProvider = {
    getList: async (resource: string) => {
        const response = await fetch(`${API_URL}/${resource}`);
        const data = await response.json();
        return { data, total: data.length };
    },

    getOne: async (resource: string, params: any) => {
        const response = await fetch(`${API_URL}/${resource}/${params.id}`);
        const data = await response.json();
        return { data };
    },

    getMany: async (resource: string, params: any) => {
        const response = await fetch(`${API_URL}/${resource}`);
        const allData = await response.json();
        const data = allData.filter((item: any) => params.ids.includes(item.id));
        return { data };
    },

    create: async (resource: string, params: any) => {
        const response = await fetch(`${API_URL}/${resource}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return { data };
    },

    update: async (resource: string, params: any) => {
        const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params.data),
        });
        const data = await response.json();
        return { data };
    },

    delete: async (resource: string, params: any) => {
        await fetch(`${API_URL}/${resource}/${params.id}`, { method: "DELETE" });
        return { data: { id: params.id } };
    },

    deleteMany: async (resource: string, params: any) => {
        await Promise.all(
            params.ids.map((id: string) =>
                fetch(`${API_URL}/${resource}/${id}`, { method: "DELETE" })
            )
        );
        return { data: params.ids };
    },
};

export default dataProvider;