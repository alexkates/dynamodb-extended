# DynamoDB Extended

![DynamoDB Extended Logo](assets/icon.png)

A Chrome extension that enhances your AWS DynamoDB console experience with powerful features for developers and database administrators.

## Features

- **Query History**: Automatically save your recent DynamoDB queries for quick access
- **Favorites**: Mark frequently used queries as favorites for easy retrieval
- **Auto-Unmarshall JSON**: Automatically switch to unmarshalled JSON view for better readability
- **Customizable Item Editor**: Adjust the height of your item editor for improved usability
- **Intuitive UI**: Clean, modern interface built with Shadcn/UI components

## Installation

Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/dynamodb-extended-query-h/chdahhohgeddblidnmphgndkcbofpbaa) and click "Add to Chrome" to install the extension.

## Development

This extension is built using:
- [Plasmo](https://docs.plasmo.com/) - Browser extension framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - UI component library

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. The extension will be loaded in development mode

### Building for Production

```bash
pnpm build
```

This will create a production bundle in the `build` directory, ready to be published to the Chrome Web Store.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve DynamoDB Extended.

## License

[MIT](LICENSE)