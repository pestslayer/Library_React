const token = "1160de15165b74e03b1e9c13cf2022ae6d645051c0ae9340";

export const server_calls = {
  get: async () => {
    const response = await fetch(`https://library-api-86an.onrender.com/api/stock`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": `${token}`,
      },
    });
    if (!response.ok){
        throw new Error('Failed to fetch data from the server')
    }
    return await response.json()
  },

  create: async (data: any ={}) => {
    const response = await fetch(`https://library-api-86an.onrender.com/api/stock`,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": `${token}`,
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error('Failed to create new data on the server')
    }
    return await response.json
  },

  update: async (id: string, data:any = {}) => {
    const response = await fetch(`https://library-api-86an.onrender.com/${id}`,
    {   
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": `${token}`,
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error('Failed to update data on the server')
    }
    return await response.json()
  },

  delete: async (id: string) => {
    const response = await fetch(`https://library-api-86an.onrender.com/${id}`,
    {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": `${token}`,
        },
    })
    if (!response.ok) {
        throw new Error('Failed to delete data from the server')
    }
    return;
  }
};
