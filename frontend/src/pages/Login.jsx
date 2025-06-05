function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/auth/github";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo!</h1>
      <p className="mb-4">Clique abaixo para fazer login com o GitHub:</p>
      <button
        onClick={handleLogin}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg"
      >
        Login com GitHub
      </button>
    </div>
  );
}

export default Login;