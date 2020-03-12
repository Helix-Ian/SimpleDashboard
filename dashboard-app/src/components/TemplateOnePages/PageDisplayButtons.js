import React from 'react';

const PageDisplayButtons = (props) => {
    const viewModeCallback = props.viewModeCallback;

    /**
     * Fired whenever the Show All button is clicked
     */
    const onShowAllButtonClick = () => {
        viewModeCallback(true);
    }

    /**
     * Fired whenever the Show One button is clicked
     */
    const onShowOneButtonClick = () => {
        viewModeCallback(false);
    }

    return (
        <div>
            <button onClick={onShowAllButtonClick}>Show All</button>
            <button onClick={onShowOneButtonClick}>Show One</button>
        </div>
    )
}

export default PageDisplayButtons;