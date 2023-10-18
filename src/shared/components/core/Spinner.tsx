import {useEffect, useState} from "react";

export function Spinner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setShow(true)
    }, 1000)

    return () => clearTimeout(debounce) //oermette di cancellare il timeout se l'utente cambia pagina prima che scatti il timeout e quindi evita di mostrare lo spinner
  }, [setShow]) //le dipendenze usate all'interno di useEffect devono essere dichiarate come dipendenze di useEffect


  return show ? <div className="flex w-full justify-center my-4">
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
      </div> : null
}