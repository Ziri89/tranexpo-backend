import React from "react";
import { useTranslation } from "react-i18next";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";
import "./About.css";

const About = () => {
    const { t, i18n } = useTranslation();
    return (
        <section id="about">
            <Banner
                image={Storehous_1}
                altText="Storehouse"
                title={t("about_title")}
            />
            <div className="container about mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2>KONTAKTADRESSE</h2>
                                <ul className="list-unstyled">
                                    <li>Tranexpo</li>
                                    <li>Egliswilerstrasse 1</li>
                                    <li>5703 Seon</li>
                                    <li>Schweiz</li>
                                    <li>tranexpo@gmx.ch</li>
                                </ul>
                                <h2>VERTRETUNGSBERECHTIGTE PERSONEN</h2>
                                <ul className="list-unstyled">
                                    <li>Elvis Dubica, Inhaber</li>
                                    <li>Lukas Schulthess, Inhaber</li>
                                </ul>
                                <h2>HANDELSREGISTEREINTRAG</h2>
                                <ul className="list-unstyled">
                                    <li>Eingetragener Firmenname: Tranexpo</li>
                                    <li>Nummer: CHE-380.368.052</li>
                                </ul>
                                <h2>HAFTUNGSAUSSCHLUSS</h2>
                                <p className="text-justify">
                                    Der Autor übernimmt keinerlei Gewähr
                                    hinsichtlich der inhaltlichen Richtigkeit,
                                    Genauigkeit, Aktualität, Zuverlässigkeit und
                                    Vollständigkeit der Informationen.
                                    Haftungsansprüche gegen den Autor wegen
                                    Schäden materieller oder immaterieller Art,
                                    welche aus dem Zugriff oder der Nutzung bzw.
                                    Nichtnutzung der veröffentlichten
                                    Informationen, durch Missbrauch der
                                    Verbindung oder durch technische Störungen
                                    entstanden sind, werden ausgeschlossen. Alle
                                    Angebote sind unverbindlich. Der Autor
                                    behält es sich ausdrücklich vor, Teile der
                                    Seiten oder das gesamte Angebot ohne
                                    gesonderte Ankündigung zu verändern, zu
                                    ergänzen, zu löschen oder die
                                    Veröffentlichung zeitweise oder endgültig
                                    einzustellen.
                                </p>
                                <h2>HAFTUNG FÜR LINKS</h2>
                                <p className="text-justify">
                                    Verweise und Links auf Webseiten Dritter
                                    liegen ausserhalb unseres
                                    Verantwortungsbereichs Es wird jegliche
                                    Verantwortung für solche Webseiten
                                    abgelehnt. Der Zugriff und die Nutzung
                                    solcher Webseiten erfolgen auf eigene Gefahr
                                    des Nutzers oder der Nutzerin
                                </p>
                                <h2>URHEBERRECHTE</h2>
                                <p className="text-justify">
                                    Die Urheber- und alle anderen Rechte an
                                    Inhalten, Bildern, Fotos oder anderen
                                    Dateien auf der Website gehören
                                    ausschliesslich der Firma Tranexpo oder den
                                    speziell genannten Rechtsinhabern. Für die
                                    Reproduktion jeglicher Elemente ist die
                                    schriftliche Zustimmung der
                                    Urheberrechtsträger im Voraus einzuholen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
