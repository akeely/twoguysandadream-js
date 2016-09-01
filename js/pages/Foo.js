import {
    React,
    Component
} from 'react';

import {
    render
} from 'react-dom';

class Foo extends Component {

    render() {
        return (
            <p>At least something is here.</p>
        );
    }
}

render(
    <Foo />,
    document.getElementById('auctionBoard')
  );
