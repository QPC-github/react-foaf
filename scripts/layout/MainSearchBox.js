/** @jsx React.DOM */

var MainSearchBox = React.createClass({
    mixins: [WithLogger,WithLifecycleLogging],
    componentName: "MainSearchBox",

    getInitialState: function() {
        return {text: this.props.filterText};
    },

    render: function() {
        return (
            <form id="search" onSubmit={this._handleSubmit}>
                <input type="text"
                    placeholder="Search your contacts"
                    value={this.state.text}
                    width="100"
                    ref="url"
                    onChange={this._onChange}
                />
                <button type="submit"  class="fontawesome-ok"></button>
                <button type="submit" onClick={this._loadProfileFromUrl} class="fontawesome-ok">
                    <Pix src={this._getUserImg()}/>
                </button>
            </form>
            );
    },

    //
    _loadProfileFromUrl: function() {
        var contactURL = this.props.personPG.getPointerUrl();
        this.props.loadCurrentUserProfileFromUrl(contactURL);
    },

     /*
     * Handlers.
     * Use e.preventDefault() or return false to : Cancel browser default behavior of submit.
     * */
     _handleSubmit: function(e) {
         e.preventDefault();
        //this.props.onUserInput(this.state.text);
    },

    _onChange: function(e) {
        e.preventDefault();
        this.setState({text: e.target.value});
    },

    // Get image.
    _getUserImg: function() {
        var personPG = this.props.personPG;
        var imgUrlList = foafUtils.getImg([personPG]);
        return (imgUrlList && imgUrlList.length>0)? imgUrlList[0]:"img/avatar.png";
    }
});

