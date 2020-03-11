import React from "react";

const DoneButton = (props) => {

    /**
     * Determines if the button is clickable
     * @returns true if there are no empty comment boxes, false otherwise
     */
    const isSubmittable = () => {
        for (var i = 0; i < props.commentRefs.length; i++) {
            // if comment box exists and is empty
            if (props.commentRefs[i] && props.commentRefs[i].current.value.length === 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Fires when the button is clicked (and enabled)
     */
    const onClick = () => {
        console.log("click");
    };

    return (
        <div>
            <button onClick={onClick} disabled={!isSubmittable()}>Done</button>
        </div>
    );
};

export default DoneButton;