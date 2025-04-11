import api from "./AxiosConfig"
 

export const getDecks = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await api.get("http://localhost:8000/decks/get-deck", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania decków:", error);
    throw error;
  }
};
