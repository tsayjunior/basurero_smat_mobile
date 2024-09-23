
carpetas

  /src
    /components
        ├── AuthButton.js         # Botones reutilizables (por ejemplo, para login y logout)
    /screens
        ├── HomeScreen.js          # Pantalla principal después de iniciar sesión
        ├── LoginScreen.js         # Pantalla de inicio de sesión
    /services
        ├── authService.js         # Lógica de negocio para manejar la autenticación (API, validaciones, etc.)
    /redux
        ├── store.js               # Configuración del store de Redux
        ├── slices
            ├── authSlice.js       # Slice de Redux para manejar el estado de autenticación
    /utils                        # Funciones utilitarias (formatos, validaciones, manejo de errores, manipulación de datos, configuraciones...)
        ├── validators.js           # Funciones para validar credenciales (si es necesario)
    /hooks
        ├── useAuth.js             # Hook personalizado para manejar el estado de autenticación
