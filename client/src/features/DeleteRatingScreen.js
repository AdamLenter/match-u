import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import NavigationMenu from './NavigationMenu';

function DeleteRatingScreen({ userInfo }) {
    
    const params = useParams();

    return (
        <div>
            <NavigationMenu />
            <br />
            <h1>
                {params.ratingId > 0 && userInfo.contact && userInfo.contact.contact_ratings ? (
                    !userInfo.contact.contact_ratings.find((rating) => rating.id === params.ratingId) ? 
                        "Rating Successfully Deleted" 
                        :
                        "An error has occurred."
                    ): (
                        "Deleting Rating..."
                    )}
            </h1>
            <br />
            <Link to = "/myRatings">Return to my ratings</Link>
        </div>
    );
}

export default DeleteRatingScreen;
