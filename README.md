# ASOBARES Colombia — Biblioteca Virtual

## Estructura del proyecto

```
asobares/
├── index.html                  ← Página de entrada
├── package.json
├── vite.config.js
├── public/
│   └── logo.png                ← ⭐ PON AQUÍ TU LOGO
└── src/
    ├── main.jsx                ← Punto de arranque de React
    ├── App.jsx                 ← Componente raíz
    ├── styles.css              ← Todos los estilos
    ├── data.js                 ← ⭐ USUARIOS Y PDFs (editar aquí)
    └── components/
        ├── LoginPage.jsx       ← Pantalla de inicio de sesión
        ├── LibraryPage.jsx     ← Biblioteca principal
        ├── PdfCard.jsx         ← Tarjeta de cada documento
        └── PdfModal.jsx        ← Visor de PDF
```

---

## Instalación y uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar en modo desarrollo
```bash
npm run dev
```
Abre http://localhost:5173 en tu navegador.

### 3. Compilar para producción
```bash
npm run build
```

---

## Personalización

### Agregar el logo
Copia tu imagen de logo como `logo.png` dentro de la carpeta `/public`.
El logo se mostrará automáticamente en el login y en el header.

### Agregar o editar usuarios
Abre `src/data.js` y edita el arreglo `USERS`:
```js
{ username: "nuevo", password: "clave123", role: "user", name: "Nombre Completo" }
```

### Agregar PDFs desde Google Drive
1. En Google Drive, haz clic derecho en el PDF → **Compartir**
2. Cambia a **"Cualquier persona con el enlace puede ver"**
3. Copia el ID del archivo (la parte larga de la URL)
4. En `src/data.js`, agrega una entrada al arreglo `PDFS`:
```js
{
  id: 9,
  title: "Nombre del Documento",
  category: "Normativa",        // debe coincidir con una categoría existente
  description: "Descripción breve del contenido.",
  driveUrl: "https://drive.google.com/file/d/TU_ID_AQUI/preview",
  icon: "📄",
  date: "Marzo 2026",
  pages: 20,
}
```

### Cambiar colores de categorías
En `src/data.js`, edita el objeto `CATEGORY_COLORS`.

---

## Usuarios de prueba
| Usuario | Contraseña  | Nombre         |
|---------|-------------|----------------|
| admin   | asobares2024| Administrador  |
| socio1  | socio123    | Carlos Pérez   |
| socio2  | socio456    | María González |
