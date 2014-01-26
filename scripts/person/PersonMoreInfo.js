/** @jsx React.DOM */

var PersonMoreInfo = React.createClass({
    mixins: [WithLogger,WithLifecycleLogging, RdfLinkedPgMixin],
    componentName: "PersonMoreInfo",

    // TODO: described as bad practice to put props data in state
    getInitialState: function() {
        return {
            personPGCopy: this.props.personPG
        }
    },

    render: function() {
        var personPG = this.state.personPGCopy; // TODO remove when possible

        // Get more info.
        var moreInfo = this._getMoreInfo();
        this.log(moreInfo)

        // Define Html.
        var viewTree =
            <div id="details">
            <div className="title center-text title-case">DETAILS</div>
            <ul className="clearfix span3">
                <li className="float-left">
                    <div className="email">
                        <div className="title-case">Email</div>
                        <div className="content email-content">{moreInfo["foaf:mbox"]}</div>
                    </div>
                    <div className="phone">
                        <div className="title-case">Phone</div>
                        <div className="content email-content">{moreInfo["foaf:phone"]}</div>
                    </div>
                </li>
                <li className="float-left">
                    <PersonAddress
                        modeEdit={this.props.modeEdit}
                        personPG={this.props.personPG}
                        address={this.props.address}/>
                </li>
                <li className="float-left">
                    <div className="website">
                        <div className="title-case">Website</div>
                        <div className="content website-content">
                            <a href="https://stample.co" target="_blank">{moreInfo["foaf:homepage"]}</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        var viewTreeEdit =
            <div id="details">
            <div className="title center-text title-case">DETAILS</div>

            <ul className="clearfix span3">
                <li className="float-left">
                    <div className="email">
                        <div className="title-case">Email</div>
                        <div className="content email-content">
                        <form onSubmit={this._handleSubmit}>
                            <input type="text"
                                valueLink={this.linkToPgLiteral(this.state.personPGCopy, 'foaf:mbox')} />
                        </form>
                        </div>
                    </div>
                    <div className="phone">
                        <div className="title-case">Phone</div>
                        <div className="content email-content">
                            <form onSubmit={this._handleSubmit}>
                                <input type="text"
                                    valueLink={this.linkToPgLiteral(this.state.personPGCopy, 'foaf:phone')} />
                            </form>
                        </div>
                    </div>
                </li>
                <li className="float-left">
                    <PersonAddress
                        modeEdit={this.props.modeEdit}
                        personPG={this.props.personPG}
                        submitEdition={this.props.submitEdition}/>
                </li>
                <li className="float-left">
                    <div className="website">
                        <div className="title-case">Website</div>
                        <div className="content website-content">
                                <form onSubmit={this._handleSubmit}>
                                    <input type="text"
                                        valueLink={this.linkToPgLiteral(this.state.personPGCopy, 'foaf:homepage')} />
                                </form>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        // Return depending on the mode.
        return (this.props.modeEdit)? viewTreeEdit: viewTree;
    },

    _handleSubmit: function(e) {
        e.preventDefault();
        this.props.submitEdition();
    },

    _getMoreInfo: function() {
        var personPG = this.props.personPG; // TODO remove when possible
        var emailList = foafUtils.getEmails(personPG);
        var phoneList = foafUtils.getPhones(personPG);
        var homepageList = foafUtils.getHomepages(personPG);

        // Return.
        return {
            "foaf:mbox":emailList[0],
            "foaf:phone":phoneList[0],
            "foaf:homepage":homepageList[0]
        };
    }

});