## BoxIdea - v1.3.0

## Description

**BoxIdea** is a collaborative platform designed to empower employees within organizations to submit innovative ideas related to their work environment. It fosters a culture of innovation, encourages knowledge exchange, and facilitates the development of creative solutions.

## Features

* **Idea Submission:** Users can easily submit their ideas, including a compelling title, a detailed description, and optional information about the author's name.
* **Idea Search:** A powerful search functionality enables users to discover ideas quickly by searching for keywords within titles and descriptions.
* **Idea Viewing:** Users can view ideas in detail, including the title, author's name (if provided), a comprehensive description, and the area of expertise the idea relates to.
* **Idea Filtering:** Users can refine search results by applying filters based on various themes, such as "Creativity," "Innovation," "Productivity," "Technology," "Marketing," and "Design."  Each idea is categorized with appropriate themes, ensuring accurate filtering.
* **Voting System:** A robust voting system allows users to provide feedback on ideas by upvoting or downvoting them. The vote count (upvotes - downvotes) is displayed dynamically, reflecting the community's sentiment towards each idea. 
* **Experience Details:**
    * **Data da Experiência:** Users can now specify the date related to the idea, providing context for the suggestion.
    * **Área de Atuação:** Users can also indicate the area of expertise their idea relates to, further enriching the content and providing clarity to other users.
* **Rich Text Editor (v1.3.1):**
    * The description field now uses a rich text editor, allowing users to format their text with options like bold, italics, underline, lists, and text alignment for improved clarity and presentation.  Image and link uploads are temporarily disabled and will be restored in a future release.

## Demo

Here are some images of the BoxIdea interface:

**Home Page:**

![Home Page](/frontend/images/readme/preview-home.png)

**Collaborate Page:**

![Collaborate Page](/frontend/images/readme/preview-contribuir.png)

**Learn Page:**

* Search:
![Learn Page 1](/frontend/images/readme/preview-learn-1.png)
    * Search + Ideas:
    ![Learn Page 2](/frontend/images/readme/preview-learn-2.png)
    * Filters:
    ![Learn Page 3](/frontend/images/readme/preview-learn-3.png)
    * Voting:
    ![Learn Page 3](/frontend/images/readme/voting-demo.gif)

## Requirements

### Functional Requirements

1. **Idea Submission:**
   - Allow users to submit their ideas, including title and detailed description. The author's name is optional.
   - **v1.3.0**: Implement fields for "Data da Experiência" (Date of Experience) and "Área de Atuação" (Area of Expertise) in the submission form.

2. **Idea Search:**
   - Implement a search tool to find ideas based on keywords in the title and description.

3. **Idea Viewing**:
   - Display the ideas found in the search, showing the title, author's name (if provided), the description, the date of experience, and the area of expertise.

4. **Idea Filtering:**
   - Implement a filtering system that allows users to refine their search results based on themes, such as "Creativity," "Innovation," "Productivity," "Technology," "Marketing," and "Design." Each idea should be categorized with appropriate themes to enable accurate filtering.

5. **Voting:** 
   - Users should be able to upvote or downvote ideas.  The vote count should be displayed and updated dynamically.

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
