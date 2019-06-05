import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from '../components/Items';


const DELETE_ITEM_MUTATION = gql `
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

class DeleteItem extends Component {
    update =(cache, payload) => {
        // manually update the cache on the ciet, so it matches the server
        // 1. Read te cache for the items
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
        //filter deleted item out of page
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
        console.log(data);
        //put items back
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data});
    }
    render() {
        return (
            <Mutation 
                mutation={DELETE_ITEM_MUTATION} 
                variables= {{id: this.props.id}}
                update={this.update}
                >
            {(deleteItem, {error}) => (
                <button onClick={() => {
                    if(confirm('Are you sure you wanna delete this item?')){
                        deleteItem();
                    }
                }}>
                {this.props.children}</button>
            )}
            </Mutation>
        );
    }
}

export default DeleteItem;