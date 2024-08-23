import React from "react";
import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';

const Filter = (props) => {
    
    
     
    const handleChange = (e) => {
        console.log(`handleChange: ${e.target.name} = ${e.target.value}`);
        props.handleChange(e);
       
      };
    const handleSubmit = (e) => {
        console.log(`handleSubmit: filter = ${JSON.stringify(props.filter)}`);
        props.handleSubmit(e);
    };

    const filter = props.filter;

    console.log(filter);


//InputSelect a InputField pro filtraci
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                   
                <InputSelect
            name="sellerId"
            items={props.personList}
            handleChange={handleChange}
            label="Dodavatel"
            prompt="nevybrán"
            value={filter.sellerId}
          />
                    
                </div>
                <div className="col">
        
            <InputSelect
             name="buyerId"
             items={props.personList}
             handleChange={handleChange}
             label="Odběratel"
             prompt="nevybrán"
             value={filter.buyerId}
           />


          
                </div>
                <div className="col">
                   
                <InputField
           type="text"
           min="0"
           name="product"
           handleChange={handleChange}
           label="Produkt"
           prompt="nevybrán"
           value={filter.product}
                    />
                </div>
                
            </div>

            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="neuveden"
                        value={filter.minPrice ? filter.minPrice : ''}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="neuveden"
                        value={filter.maxPrice ? filter.maxPrice : ''}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ''}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value={props.confirm}
                    />
                </div>
            </div>
        </form>
    );
};
export default Filter;