import { CtxApi } from "./context/CtxApi";
import { useContext } from "react";
import './styles/client.css'
export default function Client() {

    //TODO: add the buttons for the edit and delete of the request according to the local host stringyfy method
    const { currentUser, users } = useContext(CtxApi);
    return (
        <div>
            <div className="client-info">
                <h1 className="greeting">Hi!!! {currentUser.name}</h1>
                <p className="intro">Thank you for being our client. All your requests and details are mentioned below:</p>

                <div className="client-details">
                    <h3 className="details-title">CLIENT NAME</h3>
                    <p className="details">{currentUser.name}</p>
                </div>

                <div className="client-details">
                    <h3 className="details-title">Client Request</h3>
                    <p className="details">{currentUser.request}</p>
                </div>
            </div>
            <div className="developers-container">
                <h1 className="section-title">Meet Our Developers</h1>
                {users.map((user) => {
                    if (user.role === 'developer') {
                        return (
                            <span key={user.id} className="developer-card">
                                <h2 className="developer-name">{user.name}</h2>
                                <p className="developer-description">
                                    A splendid developer who would do your work quickly
                                </p>
                            </span>
                        );
                    }
                })}
            </div>


        </div>
    );
}