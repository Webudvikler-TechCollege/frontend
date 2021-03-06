import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doFetch } from "../../Helpers/doFetch";
import Style from './Regulation.module.scss';

export function Regulation(props) {

    let {animalId} = useParams();
        const [regulation, setRegulation] = useState([])

        let isRegulationActive = props.isRegulationActive;
        let setRegulationActive = props.setRegulationActive;
        let setFactsheetActive = props.setFactsheetActive;
        let setFeedingplanActive = props.setFeedingplanActive;

        const handleToggle = () => {
            setRegulationActive(!isRegulationActive)
            setFactsheetActive(false);
            setFeedingplanActive(false);
        }

        const jumpTo = () => {
            window.location.href = '#regulation';
        }

        const wrapperFunction = () => {
            handleToggle();
            jumpTo();
        };

        const query = `{
            animalsCollection(where: { sys: { id_in: "${animalId}"} }) {
                items {
                    sys {
                        id
                    }
                    name
                    regulation {
                        regulationName
                        enclosure
                        environment
                        climate
                        supervisionAndHealthControl
                        cleaning
                        handling
                        reproduction
                        enrichment
                        traning
                        registration
                        sources
                      }
                }
            }
        }`

        const getRegulation = async () => {
            let url = 'https://graphql.contentful.com/content/v1/spaces/6jz8r9ndp7ne/'
            let response = await doFetch(url, query)
            setRegulation(response.data.animalsCollection.items[0].regulation)
        }
        useEffect(() => {
            getRegulation()
        }, [])

        return(

            <article className={Style.regulation}>
                <header id="regulation" onClick={wrapperFunction} className={Style.header}>
                    <h3>Forskrifter</h3>
                    {!isRegulationActive ? <p>+</p> : <p>-</p>}
                </header>

                {isRegulationActive ?
                <div className={Style.regulationContainer}>
                    {regulation.regulationName ? <div>
                        <h4>Forskrifter</h4>
                        <p>{regulation.regulationName}</p>
                    </div> : null}

                    {regulation.enclosure ? <div>
                        <h4>Anlæg</h4>
                        <p>{regulation.enclosure}</p>
                    </div> : null}

                    {regulation.environment ? <div>
                        <h4>Miljø</h4>
                        <p>{regulation.environment}</p>
                    </div> : null}

                    {regulation.climate ? <div>
                        <h4>Kilma</h4>
                        <p>{regulation.climate}</p>
                    </div> : null}

                    {regulation.supervisionAndHealthControl ? <div>
                        <h4>Tilsyn og sundhedskontrol</h4>
                        <p>{regulation.supervisionAndHealthControl}</p>
                    </div> : null}

                    {regulation.cleaning ? <div>
                        <h4>Rengøring</h4>
                        <p>{regulation.cleaning}</p>
                    </div> : null}

                    {regulation.handling ? <div>
                        <h4>Håndtering</h4>
                        <p>{regulation.handling}</p>
                    </div> : null}

                    {regulation.reproduction ? <div>
                        <h4>Reproduktion</h4>
                        <p>{regulation.reproduction}</p>
                    </div> : null}

                    {regulation.enrichment ? <div>
                        <h4>Berigelse</h4>
                        <p>{regulation.enrichment}</p>
                    </div> : null}

                    {regulation.traning ? <div>
                        <h4>Træning</h4>
                        <p>{regulation.traning}</p>
                    </div> : null}

                    {regulation.registration ? <div>
                        <h4>Registrering</h4>
                        <p>{regulation.registration}</p>
                    </div> : null}

                    {regulation.sources ? <div>
                        <h4>Kilder</h4>
                        {regulation.sources.map(source => {
                            return (
                                <>
                                <a href={source} target="_blank">{source}</a>
                                <br />
                                </>
                            )
                        })}
                    </div> : null}
                </div> :null}
            </article>
     )
}