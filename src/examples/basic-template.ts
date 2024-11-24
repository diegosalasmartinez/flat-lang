export const sourceCode = `
    page "My Website" {
        style = "display: flex; flex-direction: column; height: 100dvh; margin: 0;"

        header {
            style = "background-color: #f0f0f0; padding: 10px 20px;"
            title {
                text = "Welcome to My Website"
                style = "color: black"
            }
            description {
                text = "This is a simple static site."
            }
        }

        section {
            style = "flex: 1; text-align: center; padding: 20px;"
            subtitle {
                text = "About Me"
            }
            description {
                text = "I am a web developer."
            }
            image {
                src = "images/dumb-cat.jpg"
                alt = "Dumb Cat"
                style = "width: 50%; height: auto;"
            }
            description {
                text = "Yes, it's literally me."
            }
        }

        footer {
            style = "background-color: #f0f0f0; padding: 10px 20px;"
            title {
                text = "Contact Me"
                style = "color: black"
            }
            description {
                text = "Created with my custom language."
            }
        }
    }
`;
