import '../../css/notification.css';

const Info = ({message}) => {
    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default Info;