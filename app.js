//import necessary modules
const express = require('express');
const fs = require('fs');


//place imported modules in a variable
let app = express();
let menu = JSON.parse(fs.readFileSync('./data/menu.json'));
app.use(express.json());


const getFoodList = (req, res) => {
    res.status(200).json(
        {
            status: "success",
            "count": menu.length,
            data: {
                "food menu": menu
            }
        }
    );
}


const getFood = (req, res) => {
    const id = Number(req.params.id);
    let food = menu.find(meal => meal.id === id);

    if(!food){
        return res.status(404).json({
            status: "fail",
            message: `Movie with ID ${id} is not found.`
        })
    }
    
    res.status(200).json({
        status: "success",
        data: {
            menu: food
        }
    })
}


const postFood = (req, res) => {
    const newId = menu[menu.length - 1].id + 1;
    const newMenu = Object.assign({id: newId}, req.body);
    menu.push(newMenu)
    fs.writeFile('./data/menu.json', JSON.stringify(menu), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                "food menu": newMenu
            }
        })
    });
}


const updateFood = (req, res) =>{
    const id = Number(req.params.id);
    const foodToUpdate = menu.find(meal => meal.id === id);

    if(!foodToUpdate) {
        return res.status(404).json({
            status: "fail",
            message: `Menu item with ID ${id} not found` 
        });
    }

    const foodIndex = menu.indexOf(foodToUpdate);

    Object.assign(foodToUpdate, req.body);
    menu[foodIndex] = foodToUpdate;

    fs.writeFile('./data/menu.json', JSON.stringify(menu), (err) => {
        if (err) {
            return res.status(500).json({
                status: "fail",
                message: "Error saving the updated menu item."
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                menu: foodToUpdate
            }
        });
    });
}


const deleteFood = (req, res) => {
    const id = Number(req.params.id);
    const menuToDelete = menu.find(meal => meal.id === id);

    if(!menuToDelete) {
        return res.status(404).json({
            status: "fail",
            message: `No menu object with ID ${id} is found.`
        })
    }

    const index = menu.indexOf(menuToDelete);
    menu.splice(index, 1);

    fs.writeFile('./data/menu.json', JSON.stringify(menu), (err) => {
        if (err) {
            return res.status(500).json({
                status: "fail",
                message: "Error saving the updated menu item."
            });
        }
        res.status(204).json({
            status: "success",
            data: {
                menu: null
            }
        });
    });
}


//routing
app.route('/api/menu').get(getFoodList).post(postFood);

app.route('/api/menu/:id').patch(updateFood).delete(deleteFood).get(getFood);


//server
const port = 3000;
app.listen(port, () => {
    console.log('Your server is running...');   
});

