import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from "./router";

import DialogService from 'primevue/dialogservice';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import InputSwitch from 'primevue/inputswitch';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import ProgressSpinner from 'primevue/progressspinner';
import TextArea from 'primevue/textarea';
import SplitButton from 'primevue/splitbutton';
import Card from 'primevue/card';
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import Steps from 'primevue/steps';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import './style.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);
app.component('InputSwitch', InputSwitch);
app.component('Password', Password);
app.component('Dropdown', Dropdown);
app.component('MultiSelect', MultiSelect);
app.component('Calendar', Calendar);
app.component('Checkbox', Checkbox);
app.component('RadioButton', RadioButton);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Textarea', TextArea);
app.component('SplitButton', SplitButton);
app.component('Card', Card);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Dialog', Dialog);

app.use(router);
app.use(DialogService);

app.mount('#app');
