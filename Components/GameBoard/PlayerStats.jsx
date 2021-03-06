import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Site/Avatar';

export class PlayerStats extends React.Component {
    constructor() {
        super();

        this.sendUpdate = this.sendUpdate.bind(this);
    }

    sendUpdate(type, direction) {
        this.props.sendGameMessage('changeStat', type, direction === 'up' ? 1 : -1);
    }

    getStatValueOrDefault(stat) {
        if(!this.props.stats) {
            return 0;
        }

        return this.props.stats[stat] || 0;
    }

    getButton(stat, name, showControls = true) {
        return (
            <div className='state'>
                <span><img src={ '/img/' + name + '.png' } title={ name } alt={ name } /></span>
                { showControls ? <button className='btn btn-stat' onClick={ this.sendUpdate.bind(this, stat, 'down') }>
                    <img src='/img/Minus.png' title='-' alt='-' />
                </button> : null }

                <span>{ this.getStatValueOrDefault(stat) }</span>
                { showControls ? <button className='btn btn-stat' onClick={ this.sendUpdate.bind(this, stat, 'up') }>
                    <img src='/img/Plus.png' title='+' alt='+' />
                </button> : null }
            </div>
        );
    }

    onSettingsClick(event) {
        event.preventDefault();

        if(this.props.onSettingsClick) {
            this.props.onSettingsClick();
        }
    }

    render() {
        var playerAvatar = (
            <div className='player-avatar'>
                <Avatar username={ this.props.user ? this.props.user.username : undefined } />
                <b>{ this.props.user ? this.props.user.username : 'Noone' }</b>
            </div>);

        return (
            <div className='panel player-stats'>
                { playerAvatar }

                { this.getButton('ghostrock', 'Ghost Rock', this.props.showControls) }
                { this.getButton('control', 'Control', false) }
                { this.getButton('influence', 'Influence', false) }

                { this.props.firstPlayer ? <div className='state'><div className='first-player'>Lowball Winner</div></div> : null }

                { this.props.showControls ? <div className='state'>
                    <button className='btn btn-transparent' onClick={ this.onSettingsClick.bind(this) }><span className='glyphicon glyphicon-cog' />Settings</button>
                </div> : null }

                { this.props.showMessages &&
                    <div className='chat-status' onClick={ this.props.onMessagesClick }>
                        <button className='btn btn-transparent'>
                            <span className='glyphicon glyphicon-envelope' />
                            <span className='chat-badge badge progress-bar-danger'>{ this.props.numMessages || null }</span>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

PlayerStats.displayName = 'PlayerStats';
PlayerStats.propTypes = {
    firstPlayer: PropTypes.bool,
    numMessages: PropTypes.number,
    onMessagesClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
    control: PropTypes.number,
    ghostrock: PropTypes.number,
    influence: PropTypes.number,
    playerName: PropTypes.string,
    sendGameMessage: PropTypes.func,
    showControls: PropTypes.bool,
    showMessages: PropTypes.bool,
    stats: PropTypes.object,	
    user: PropTypes.object
};

export default PlayerStats;
