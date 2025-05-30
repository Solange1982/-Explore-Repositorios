import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchRepos = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos`, {
        params: {
          per_page: 10,
          page,
          sort: "stars",
          direction: sort,
        },
      });
      setRepos(res.data);
    } catch (err) {
      alert("Erro ao buscar repositórios.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (repo) => {
    const exists = favorites.find((r) => r.id === repo.id);
    let updated;
    if (exists) {
      updated = favorites.filter((r) => r.id !== repo.id);
    } else {
      updated = [...favorites, repo];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("jwt", token);
    alert("Login com GitHub realizado com sucesso!");
  
    window.history.replaceState({}, "", "/");
  }
}, []);

useEffect(() => {
  if (!showFavorites) {
    fetchRepos();
  }
}, [page, sort]);


  const displayedRepos = showFavorites ? favorites : repos;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">GitHub Repositórios</h1>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Usuário do GitHub"
          className="px-4 py-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => {
            setPage(1);
            fetchRepos();
          }}
        >
          Buscar
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        >
          Ordenar por estrelas: {sort === "desc" ? "↓" : "↑"}
        </button>
        <button
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Ver Todos" : "Ver Favoritos"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={() => window.location.href = "http://localhost:4000/auth/github"}
        >
          Login com GitHub
        </button>
        <button
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
          onClick={() => alert("Função de criação de repositório será implementada.")}
        >
          Criar Repositório
        </button>
      </div>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : displayedRepos.length === 0 ? (
        <p className="text-center">Nenhum repositório encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {displayedRepos.map((repo) => (
            <li key={repo.id} className="bg-gray-800 p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{repo.name}</h2>
                  <p className="text-sm text-gray-300">{repo.description}</p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline text-sm"
                  >
                    Ver no GitHub
                  </a>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm mb-2">⭐ {repo.stargazers_count}</span>
                  <button
                    onClick={() => toggleFavorite(repo)}
                    className={`px-3 py-1 rounded ${
                      favorites.find((r) => r.id === repo.id)
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {favorites.find((r) => r.id === repo.id) ? "Desfavoritar" : "Favoritar"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!showFavorites && repos.length > 0 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Anterior
          </button>
          <span className="px-4 py-2">Página {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

export default App;