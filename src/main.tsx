import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import React from 'react';

import { Provider } from 'react-redux';
import store, { persistor } from './store/store'; // ✅ persistStore도 함께 import
import { PersistGate } from 'redux-persist/integration/react'; // ✅ persist gate 컴포넌트 import

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Redux 상태 공급 */}
      <PersistGate loading={null} persistor={persistor}> {/* ✅ 새로고침 시 localStorage에서 복구될 때까지 기다려줌 */}
        <App /> {/* App이 복구 완료 후에 렌더링됨 */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);