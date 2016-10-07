

export const GET_AUCTION_BOARD = 'GET_AUCTION_BOARD';

export function getAuctionBoard() {

    let auctionPlayers = [];

    const leagueId = $("meta[name='_league_id'").attr('content');

    $.ajax('/api/league/' + leagueId + '/bid', {async: false}).done((response) => {
        auctionPlayers = response;
    });
    
    return {
        type: GET_AUCTION_BOARD,
        auctionPlayers: [...auctionPlayers]
    };
};
