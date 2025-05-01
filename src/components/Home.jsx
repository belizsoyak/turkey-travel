import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">
      <h1>Welcome to Turkey!</h1>
      <p>Where would you like to visit today?</p>
      <button onClick={() => navigate('/cities')} className="saved-btn" >
        Click to explore a city!
        </button>
    </section>
  );
}

export default Home;