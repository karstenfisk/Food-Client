import instance from "@/instance";

export const getIngredients = async (token: string) => {
  try {
    const { data } = await instance.get(`/meals/ingredients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return { error: "Error getting ingredients" };
  }
};
