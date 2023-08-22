const PopupUtils = {
    setErrorMessage: (setErrorMessage, duration) => {
        setErrorMessage("Something went wrong");
        setTimeout(() => {
            setErrorMessage(null);
        }, 3500);
    }
}