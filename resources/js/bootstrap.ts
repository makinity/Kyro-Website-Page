import axios from 'axios';

// Configure axios with CSRF token for all requests
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}
