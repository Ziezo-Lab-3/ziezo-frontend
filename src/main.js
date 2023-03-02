import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

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
import Spinner from 'primevue/spinner';
import TextArea from 'primevue/textarea';
import SplitButton from 'primevue/splitbutton';
import Card from 'primevue/card';
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';

import './style.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(Button);
app.use(InputText);
app.use(InputNumber);
app.use(InputMask);
app.use(InputSwitch);
app.use(Password);
app.use(Dropdown);
app.use(MultiSelect);
app.use(Calendar);
app.use(Checkbox);
app.use(RadioButton);
app.use(Spinner);
app.use(TextArea);
app.use(SplitButton);
app.use(Card);
app.use(ConfirmDialog);
app.use(Dialog);

createApp(App).mount('#app');
