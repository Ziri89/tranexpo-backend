import React, { useState } from "react";
import Carriers from "../admin-components/Carriers";
import Goods from "../admin-components/Goods";
import Passengers from "../admin-components/Passengers";
import "./AdminDashboard.css";

const AdminPanel = () => {
    const [active, setActive] = useState("publishers");

    const btnClickHandler = ev => {
        ev.preventDefault();
        const target = ev.target.dataset.target;
        setActive(target);
    };
    return (
        <div id="admin-panel">
            <div className="container-fluid">
                <h1 className="text-center">
                    Administratorska kontrolna ploča
                </h1>
                <main className="row">
                    <aside className="col-2">
                        <h2>Izaberi pregled</h2>
                        <ul className="list-group bg-dark">
                            <li className="list-group-item bg-transparent">
                                <button
                                    className="btn btn-danger btn-block"
                                    data-target="publishers"
                                    onClick={btnClickHandler}
                                >
                                    Korisnici objavljivači
                                </button>
                            </li>
                            <li className="list-group-item bg-transparent">
                                <button
                                    className="btn btn-danger btn-block"
                                    data-target="carriers"
                                    onClick={btnClickHandler}
                                >
                                    Korisnici prevoznici
                                </button>
                            </li>
                            <li className="list-group-item bg-transparent">
                                <button
                                    className="btn btn-danger btn-block"
                                    data-target="goods"
                                    onClick={btnClickHandler}
                                >
                                    Postovi za prevoz tereta
                                </button>
                            </li>
                            <li className="list-group-item bg-transparent">
                                <button
                                    className="btn btn-danger btn-block"
                                    data-target="passengers"
                                    onClick={btnClickHandler}
                                >
                                    Postovi za prevoz putnika
                                </button>
                            </li>
                        </ul>
                    </aside>
                    <section className="col-10">
                        <article
                            id="publishers"
                            className={
                                active === "publishers"
                                    ? "article active"
                                    : "article"
                            }
                        >
                            <h2 className="text-center">
                                Objavljivači postova
                            </h2>
                        </article>
                        <article
                            id="carriers"
                            className={
                                active === "carriers"
                                    ? "article active"
                                    : "article"
                            }
                        >
                            <h2 className="text-center">Prevoznici</h2>
                            <Carriers />
                        </article>
                        <article
                            id="goods"
                            className={
                                active === "goods"
                                    ? "article active"
                                    : "article"
                            }
                        >
                            <h2 className="text-center">
                                Postovi za prevoz robe
                            </h2>
                            <Goods />
                        </article>
                        <article
                            id="passengers"
                            className={
                                active === "passengers"
                                    ? "article active"
                                    : "article"
                            }
                        >
                            <h2 className="text-center">
                                Postovi za prevoz putnika
                            </h2>
                            <Passengers />
                        </article>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
