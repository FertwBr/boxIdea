# BoxIdea

## Description

**BoxIdea** is a collaborative system where employees can submit their ideas related to the work environment. The submitted information is stored in a database, allowing other users to consult these ideas, fostering an environment of innovation and knowledge sharing.

## Features

- **Idea Submission**: Users can submit their ideas, including title, detailed description, and name (optional).
- **Idea Search**: Users can search for ideas based on keywords in the title and description.
- **Idea Viewing**: Users can view ideas, including title, author's name, and description.

## Demo

Here are some images of the BoxIdea interface:

**Home Page:**

![Home Page](/frontend/images/readme/preview-home.png)

**Collaborate Page:**

![Collaborate Page](/frontend/images/readme/preview-contribuir.png)

**Learn Page:**

![Learn Page 1](/frontend/images/readme/preview-learn-1.png)
![Learn Page 2](/frontend/images/readme/preview-learn-2.png)


## Requirements

### Functional Requirements

1. **Idea Submission**:
   - Allow users to submit their ideas, including title and detailed description. The author's name is optional.

2. **Idea Search**:
   - Implement a search tool to find ideas based on keywords in the title and description.

3. **Idea Viewing**:
   - Display the ideas found in the search, showing the title, author's name (if provided), and the description.

### Non-Functional Requirements

1. **Availability**:
   - The system should be available 24/7, with minimal downtime.

2. **Security**:
   - Implement security measures to protect user information. *(TODO: Detail specific security measures)*

3. **Scalability**:
   - The system should be able to handle an increase in the number of users and data volume. *(TODO: Describe scalability strategies)*

4. **Usability**:
   - The interface should be simple and intuitive, facilitating navigation and use.

5. **Maintainability**:
   - The code should be well-structured and documented for easy maintenance and future updates.

6. **Compatibility**:
    - The system should be compatible with various modern web browsers across different devices, including desktops, laptops, tablets, and smartphones.


## Technologies Used

- **Backend**: Java with Spring Boot
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, and JavaScript


## Installation and Execution

**Prerequisites:**

- Java Development Kit (JDK) 17 or higher
- Maven
- PostgreSQL (and have a database configured)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/boxidea.git 
   ```
2. **Navigate to the project directory:**
   ```bash
   cd boxidea
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the project root with the following settings (adapt to your environment):
     ```
     SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_database_name
     SPRING_DATASOURCE_USERNAME=your_username
     SPRING_DATASOURCE_PASSWORD=your_password
     ```
4. **Install dependencies:**
   ```bash
   mvn install
   ```
5. **Run the project:**
   ```bash
   mvn spring-boot:run
   ```

## Contributing

1. Fork the project.
2. Create a branch with your feature: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a pull request.


## License

This project is licensed under the [MIT License](LICENSE).
