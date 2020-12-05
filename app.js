$(document).ready(_=>{
    let query_obj = ["carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", "green pepper", "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper", "tomato", "beetroot", "brussel sprouts", "peas", "zucchini", "radish", "sweet potato", "artichoke", "leek", "cabbage", "celery", "chili", "garlic", "basil", "coriander", "parsley", "dill", "rosemary", "oregano", "cinnamon", "saffron", "green bean", "bean", "chickpea", "lentil", "apple", "apricot", "avocado", "banana", "blackberry", "blackcurrant", "blueberry", "boysenberry", "cherry", "coconut", "fig", "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee", "mandarin", "mango", "melon", "nectarine", "orange", "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "pomegranate", "quince", "raspberry", "strawberry", "watermelon", "salad", "pizza", "pasta", "popcorn", "lobster", "steak", "bbq", "pudding", "hamburger", "pie", "cake", "sausage", "tacos", "kebab", "poutine", "seafood", "chips", "fries", "masala", "paella", "som tam", "chicken", "toast", "marzipan", "tofu", "ketchup", "hummus", "chili", "maple syrup"]
    let data_retrieve = _=>{
        let datafetch = fetch(`https://forkify-api.herokuapp.com/api/search?q=${$('#search').val()}&format=json`)
        document.querySelector('.loader').style.display = 'block'
        datafetch.then(data => data.json())
        .then(data => {
            data.recipes.forEach(datas =>{
                document.querySelector('.finalresults').style.display = 'block'
                $('#results').append(`
                    <div class="col-4 mt-4">
                        <div class="card m-1">
                        <img src="${datas.image_url}" alt="" class="img-responsive card-img-top" onclick='ingredients(${datas.recipe_id})' style="width:100%; height: 300px">
                            <div class="card-body">
                                <h5 class="text-center">${datas.title}</h5>
                                <p class='text-center text-dark'>By : ${datas.publisher}</p>
                                <a class='text-center preview' href='#'>View More</a>
                            </div>
                        </div>
                    </div>
                `)
                document.querySelector('.loader').style.display = 'none'
                document.querySelector('.delete-icon').style.display = 'block'
            })
        })
    }
    

    $('#search').click(_=>{
        $('#search').val('')
        $('#search').css({'border' : '', 'color' : ''})
    })

    $('form').submit( e =>{
        
        e.preventDefault()
        let result = ''
        for(let elem in query_obj){
            if($('#search').val() === query_obj[elem]){
                $('.finalresults').css({'position': 'absolute', 'top': '100px', 'left': '0', 'width': '100%', 'height': '100%', 'background': '#fff',})
                result = query_obj[elem]
            }
        }
        if(result !== ''){
            data_retrieve()
        }else{
                $('#search').val('Try Another Recipe')
                $('#search').css({'border' : '1px solid red', 'color' : 'red'})
            }
    })
})

document.querySelector('.delete-icon').addEventListener('click', event=>{
    document.querySelector('.finalresults').style.display = 'none'

})
let ingredients = id =>{
    let finalfetch = fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}&format=json`)
    document.querySelector('#results').innerHTML = ''
    
    $('.endresults').css({'position': 'absolute', 'top': '100px', 'left': '0', 'width': '100%', 'height': '100%', 'background': '#fff',})
    finalfetch.then(d => d.json()).then(d =>{
        $('#endresults').append(`
        <div class="col-4 mt-4 d-flex justify-content-center">
        <div class="delete-icon" style="display: none; position: absolute; top: 20px; right: 350px;"><i class="fa fa-times fa-2x" aria-hidden="true"></i></div>
            <div class="card">
                <img src="${d.recipe.image_url}" alt="" class="img-responsive card-img-top" style="width:100%; height: 300px">
                <div class="card-body">
                    <h5 class="text-center">Publisher : ${d.recipe.publisher}</h5>
                    <p class='text-center text-dark'>Ingredients Used : ${d.recipe.ingredients} </p>
                    <p class='text-center preview' href='#'>Social Rank : ${d.recipe.social_rank}</p>
                </div>
            </div>
        </div>
        `)
    })
}
