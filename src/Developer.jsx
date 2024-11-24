import { CtxApi } from "./context/CtxApi";
import { useContext } from "react";
import './styles/dev.css';
export default function Developer() {
    const { currentUser, users } = useContext(CtxApi);
    //TODO: add the quest portal and also add edit and delte utton for tasks 
    return (
        <>
            <div className="tasks-container">
                <h1 className="welcome-text">Hi {currentUser.name}</h1>
                <h1 className="tasks-title">Your Tasks For Today</h1>
                <ol className="tasks-list">
                    {currentUser.task.map((t, index) => {
                        return (
                            <li key={index} className="task-item">
                                {t}
                            </li>
                        );
                    })}
                </ol>
            </div>

            <div className="contact-container">
                <h1 className="contact-title">Having Trouble??</h1>
                <h2 className="contact-subtitle">Contact Our Admins</h2>
                <div className="contact-cards-container">
                    {users.map((user) => {
                        if (user.role === "admin") {
                            return (
                                <span key={user.id} className="contact-card admin-card">
                                    <h3 className="contact-name">{user.name}</h3>
                                    <p className="contact-description">
                                        Contact and mention your issues to the admin for further procedure
                                    </p>
                                </span>
                            );
                        }
                    })}
                </div>

                <h2 className="contact-subtitle">Wanna Connect to Other Developers?</h2>
                <div className="contact-cards-container">
                    {users.map((user) => {
                        if (user.role === "developer") {
                            return (
                                <span key={user.id} className="contact-card developer-card">
                                    <h3 className="contact-name">{user.name}</h3>
                                    <p className="contact-description">
                                        Contact and collaborate with this developer for further procedure
                                    </p>
                                    <p className="note">
                                        Note: YOU NEED TO RAISE A REQUEST FOR THIS COLLABORATION
                                    </p>
                                </span>
                            );
                        }
                    })}
                </div>
            </div>
        </>

    );
}