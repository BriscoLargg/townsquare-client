import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CardPile from './CardPile';
import SquishableCardPanel from './SquishableCardPanel';
import DrawDeck from './DrawDeck';
import Droppable from './Droppable';

class PlayerRow extends React.Component {
    getOutOfGamePile() {
        let pile = this.props.outOfGamePile;

        if(pile.length === 0) {
            return;
        }

        let outOfGamePile = (<CardPile
            cards={ pile }
            className='additional-cards'
            onCardClick={ this.props.onCardClick }
            onDragDrop={ this.props.onDragDrop }
            onMenuItemClick={ this.props.onMenuItemClick }
            onMouseOut={ this.props.onMouseOut }
            onMouseOver={ this.props.onMouseOver }
            orientation='kneeled'
            popupLocation={ this.props.side }
            source='out of game'
            title='Out of Game'
            size={ this.props.cardSize } />);

        if(this.props.isMe) {
            return (<Droppable onDragDrop={ this.props.onDragDrop } source='out of game'>
                { outOfGamePile }
            </Droppable>);
        }

        return outOfGamePile;
    }

    renderDroppablePile(source, child) {
        return this.props.isMe ? <Droppable onDragDrop={ this.props.onDragDrop } source={ source }>{ child }</Droppable> : child;
    }

    render() {
        let cardPileProps = {
            onCardClick: this.props.onCardClick,
            onDragDrop: this.props.onDragDrop,
            onMouseOut: this.props.onMouseOut,
            onMouseOver: this.props.onMouseOver,
            popupLocation: this.props.side,
            size: this.props.cardSize
        };

        let hand = (<SquishableCardPanel
            cards={ this.props.hand }
            className='panel hand'
            groupVisibleCards
            username={ this.props.username }
            maxCards={ 5 }
            onCardClick={ this.props.onCardClick }
            onMenuItemClick={ this.props.onMenuItemClick }
            onMouseOut={ this.props.onMouseOut }
            onMouseOver={ this.props.onMouseOver }
            source='hand'
            title='Hand'
            cardSize={ this.props.cardSize } />);
        let drawHand = (<SquishableCardPanel
            cards={ this.props.drawHand }
            className='panel hand'
            groupVisibleCards
            username={ this.props.username }
            maxCards={ 5 }
            onCardClick={ this.props.onCardClick }
            onMenuItemClick={ this.props.onMenuItemClick }
            onMouseOut={ this.props.onMouseOut }
            onMouseOver={ this.props.onMouseOver }
            source='draw hand'
            title='Draw Hand'
            cardSize={ this.props.cardSize } />);			
        let drawDeck = (<DrawDeck
            cardCount={ this.props.numDrawCards }
            cards={ this.props.drawDeck }
            isMe={ this.props.isMe }
            numDrawCards={ this.props.numDrawCards }
            onPopupChange={ this.props.onDrawPopupChange }
            onShuffleClick={ this.props.onShuffleClick }
            onDrawToDrawHandClick={ this.props.onDrawToDrawHandClick }
            revealTopCard={ this.props.revealTopCard }
            showDeck={ this.props.showDeck }
            spectating={ this.props.spectating }
            { ...cardPileProps } />);
        let discardPile = (<CardPile className='discard' title='Discard' source='discard pile' cards={ this.props.discardPile }
            { ...cardPileProps } />);
        let deadPile = (<CardPile className='dead' title='Boot Hill' source='dead pile' cards={ this.props.deadPile }
            orientation='booted'
            { ...cardPileProps } />);
		// <HandRank onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} handrank={this.props.handrank} />
        return (
            <div className='player-home-row-container'>
                { this.renderDroppablePile('hand', hand) }
                { this.renderDroppablePile('draw deck', drawDeck) }
                { this.renderDroppablePile('discard pile', discardPile) }
                { this.renderDroppablePile('dead pile', deadPile) }

                { this.getOutOfGamePile() }
				
				{ this.renderDroppablePile('draw hand', drawHand) }				
            </div>
        );
    }
}

PlayerRow.displayName = 'PlayerRow';
PlayerRow.propTypes = {
    cardSize: PropTypes.string,
    deadPile: PropTypes.array,
    discardPile: PropTypes.array,
    drawDeck: PropTypes.array,
    hand: PropTypes.array,
    drawHand: PropTypes.array,	
    isMe: PropTypes.bool,
    numDrawCards: PropTypes.number,
    onCardClick: PropTypes.func,
    onDragDrop: PropTypes.func,
    onDrawPopupChange: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    onShuffleClick: PropTypes.func,
    onDrawToDrawHandClick: PropTypes.func,
    outOfGamePile: PropTypes.array,
    showDeck: PropTypes.bool,
    side: PropTypes.oneOf(['top', 'bottom']),
    spectating: PropTypes.bool,
    title: PropTypes.object,
    username: PropTypes.string
};

export default PlayerRow;
