const url = "http://localhost:3001/api/v1/";

interface CustomFetchProps {
    endpoint: string;
    method?: string;
    token: string | null;
    body?: any;
    formdata?: boolean;
    isLoader?: boolean;
}

export const customFetch = async ({ endpoint, method = "GET", token, body, formdata = false, isLoader = true }: CustomFetchProps) => {
    return await fetch(url + endpoint, {
        method: method,
        headers: formdata ? { Authorization: `Bearer ${token}` } : {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: formdata ? body : JSON.stringify(body),
    })
        .then((res) => res.json())
        .then(async (res) => {
            if (res.success) {
                return res;
            } else {
                return res;
            }
        })
        .catch((err) => {
            console.log("Error fetching data:", err);
        });
};
