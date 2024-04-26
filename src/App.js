import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Loading from './assets/Loading.json';
import axios from 'axios';
import { NotificationManager, NotificationContainer } from 'react-notifications';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const urlApi = "https://api.github.com/repos/facebook/react/issues";
    axios.get(urlApi)
      .then((response) => {
        setIssues(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error('Ocurrió un error al cargar los issues');
      });
  }, []);

  useEffect(() => {
    if (issues.length > 0) {
      NotificationManager.success('¡Los issues se cargaron correctamente!');
    }
  }, [issues]);

  const animatedOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div className="bg-gray-200 min-h-dvh">
      <header className="bg-blue-900 h-20 flex justify-center items-center">
        <input className="h-10 w-1/2 text-center bg-gray-300 rounded" type="text" placeholder="Título del issue" disabled={!loaded} />
      </header>

      {!loaded ? (
        <div className="flex justify-center items-center">
          <Lottie
            options={animatedOptions}
            height={400}
            width={400}
            isClickToPauseDisabled={true}
          />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl text-center mt-5">React Issues</h1>

          <div className="flex flex-col items-center">

            {issues.map((issue) => (
              <a
                key={issue.id}
                className="bg-gray-600 h-15 rounded-xl w-4/5 my-2"
                href={"https://github.com/facebook/react/issues/" + issue.number}
                target="_blank"
                rel="noreferrer"
              >
                <h6 className="text-center text-neutral-50">id: {issue.id}</h6>
                <h4 className="text-center text-neutral-50">{issue.title}</h4>

                <div>
                  <p>Abierto por: {issue.user.login}</p>
                </div>

                <div className="flex">
                  {issue.labels.map((label) => (
                      <h2>{label.name}</h2>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <NotificationContainer />
    </div>
  );
}

export default App;
