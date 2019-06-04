import UpdateItem from '../components/UpdateItem';
import { createLexer } from 'graphql';

const Sell = ({query}) => (
    <div>
        <UpdateItem id={query.id}/>
    </div>
)

export default Sell;