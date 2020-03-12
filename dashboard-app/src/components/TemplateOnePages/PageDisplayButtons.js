import React from 'react';

const PageDisplayButtons = (props) => {

    /**
     * Fired whenever the Show All button is clicked
     */
    const onShowAllButtonClick = () => {
        console.log('click1');
    }

    /**
     * Fired whenever the Show One button is clicked
     */
    const onShowOneButtonClick = () => {
        console.log('click2');
    }

    return (
        <div>
            <button onClick={onShowAllButtonClick}>Show All</button>
            <button onClick={onShowOneButtonClick}>Show One</button>
        </div>
    )
}

export default PageDisplayButtons;