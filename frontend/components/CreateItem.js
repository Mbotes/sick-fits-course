import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql `
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage:$largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state={
        title: 'Cool shoes',
        description: 'I love those shoes',
        image: 'coolshoes.jpg',
        largeImage: 'large-shoes.jpg',
        price: 1000
    }
    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type == 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val});
    }
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
            {(createItem, {loading, error}) => (
                <Form onSubmit={async e =>{
                    //stop the form from submitting
                    e.preventDefault();
                    // response back from server
                    const res = await createItem();
                    //redirect them to single item page
                    console.log(res);
                    Router.push({
                        pathname: '/items',
                        query: {id: res.data.createItem.id}
                    })
                }}>
                    <Error error={error}/>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="title">
                            Title
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                placeholder="Title"
                                required
                                onChange={this.handleChange}
                                value={this.state.title} />
                        </label>
                        <label htmlFor="price">
                            Price
                            <input 
                                type="text" 
                                id="price" 
                                name="price" 
                                placeholder="Price"
                                required
                                onChange={this.handleChange}
                                value={this.state.price} />
                        </label>
                        <label htmlFor="description">
                            description
                            <textarea
                                id="description" 
                                name="description" 
                                placeholder="Enter a description"
                                required
                                onChange={this.handleChange}
                                value={this.state.description} />
                        </label>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
            )}
            </Mutation>
        );
    }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};