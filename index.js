import { legacy_createStore as createStore } from 'redux'; //utilizando o legacy pois o método está datada devido ao toolkit que foi criado pelo Redux
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'; // é necessário o uso da extensão do ReduxDevTools para monitorar 

// 2. antes de criar a store é preciso ter um reducer

// 3. a aplicação precisa ter um estado inicial que o parâmetro 'state' do reducer receberá por parâmetro. vamos fazer a atribuição deste estado inicial numa variável. com estes passos, o store já foi configura na aplicação.

const INITIAL_STATE = {
  count: 0,
}

const reducer = (state = INITIAL_STATE, action ) => {
// veja que o reducer recebe por parâmetro o estado e ação que a mudará
  switch (action.type) {
    case 'DECREMENT_COUNTER':
      return {
        count: state.count -1
      }
      case 'INCREMENT_COUNTER':
      return {
        count: state.count +1
      };
      default:
        return state;
  }
}

// 1. abaixo vou criar minha store que armazena meu estado, minha função que altera o estado e também a action que muda o estado.

const store = createStore(reducer, composeWithDevToolsDevelopmentOnly())

// 4. aqui vou criar uma action que manipula o estado e será recebida no reducer com uma lógica

const incrementAction = {
  type: 'INCREMENT_COUNTER',
}
const decrementAction = {
  type: 'DECREMENT_COUNTER', // é importante observar que cada ação deve ter sua própria variável.
}

const incrementButton = document.getElementById('button-increment');
incrementButton.addEventListener("click", () => {
  store.dispatch(incrementAction) // 5. aqui foi utilizada a função dispatch que 'dispara', assim diremos, uma ação que foi criada no passo 4.
});

const decrementButton = document.getElementById('button-decrement');
decrementButton.addEventListener('click', () => {
  store.dispatch(decrementAction)
});

// 6. aqui será implementada a função subscribe que recebe uma callback que retorna uma outra função chamada getState
store.subscribe(() => {
  const globalState = store.getState();
  console.log(globalState);
  const elementButton = document.querySelector('h4');
  elementButton.innerHTML = globalState.count; // com esta lógica é possível fazer a alteração do valor dentro do elemento HTML através do javascript puro.
})