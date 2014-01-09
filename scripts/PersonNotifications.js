/** @jsx React.DOM */

var PersonNotifications = React.createClass({

    render: function() {
        console.log("Render notification");
        var notifications = this.props.getNotifications();
        return (
            <div className="notifications">
                <div className="newMessages float-left">{notifications.nbNewMessages}</div>
                <div className="recentInteractions float-left">{notifications.nbRecentInteraction}</div>
                <div className="updates float-left">{notifications.nbUpdates}</div>
            </div>
            );
    }
});