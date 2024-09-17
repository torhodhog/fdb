import Image from 'next/image';
import React from 'react';

const FdbStore: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="text-center mb-10">
        <h1 className="text-8xl font-bold">.343</h1> {/* Økt størrelsen på h1 */}
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          I juni 2024 åpnet vi Fotballdraktbutikken vår aller første butikk. Den ligger i gågaten, i hjertet av Bergen. 
          Omgitt av historiske hus og sjarmerende smau, finner du en butikk fylt opp med fotballdrakter fra de fire siste tiår. På vår første åpningsdag hadde vi 343 drakter til salgs i butikken og hver uke oppgraderer vi sortimentet. Vi har valgt at onsdager er dagen vi åpner for nye drakter til salgs i butikken. 
        </p>
      </div>
      
      <div className="flex justify-center space-x-4 mb-10">
        <Image className="w-full max-w-2xl" src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/fradisk.jpeg" alt="Fra disk" /> {/* Økt størrelsen på bildet */}
        {/* <img className="w-full max-w-2xl rounded-lg" src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/fravindu.jpeg" alt="Fra vindu" /> */}
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-2">Adresse</h2>
        <p className="text-lg">
          Strandgaten 74<br />
          5004 Bergen<br />
          Norge
        </p>

     
          <div className='flex justify-center mt-6 mb-6'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1689.5323233399326!2d5.31726373790017!3d60.39484747942451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cfd003f0fc121%3A0xcd4c7597e10f3c7c!2sfdb.343!5e1!3m2!1sno!2sno!4v1724075790058!5m2!1sno!2sno" width="600" height="450" style={{ border: "0" }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
         

        
        <h2 className="text-3xl font-semibold mt-8 mb-2">Åpningstider</h2>
        <p className="text-lg">
          Mandag - Fredag: 12:00 - 18:00<br />
          Lørdag: 12:00 - 18:00<br />
          Søndag: Stengt
        </p>
        
        <h2 className="text-3xl font-semibold mt-8 mb-2">Kontakt</h2>
        
        <a href="mailto:fdb@fotballdraktbutikken.com" className="text-blue-500 hover:underline"> {/* Gjør e-postadressen klikkbar og endrer fargen */}
          <p className="text-lg">
            E-post: <span>fdb@fotballdraktbutikken.com</span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default FdbStore;