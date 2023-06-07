import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const PrivacyPolicyBlocks = () => {
    const privacyBlocks = [
        {
            title: 'What Information is Collected',
            content: 'We collect various types of information when you use our website and services. This includes personal information such as your name, email address, and phone number, which you provide when creating an account or making a purchase. We also collect demographic information such as your age, gender, and location to better understand our audience.\n\nAdditionally, we may collect information automatically as you navigate through our website, such as your IP address, browser type, and device information.',
        },
        {
            title: 'Where Information is Collected From',
            content: 'We collect information from different sources to ensure the accuracy and completeness of the data we gather. The primary source is directly from you when you voluntarily provide information during account registration, purchase transactions, or when you contact us through forms or customer support channels.\n\nWe may also collect information from third-party sources, including social media platforms or publicly available databases, to supplement our existing data and enhance our services.',
        },
        {
            title: 'Why Information is Collected',
            content: 'We collect information for several purposes to deliver and improve our services. The information we collect helps us personalize your experience, provide customer support, process transactions, and communicate with you effectively.\n\nWe also use the data to analyze user behavior, conduct market research, and enhance the security of our website and services. Furthermore, we may collect information to comply with legal obligations and enforce our terms and policies to ensure a safe and reliable user experience for everyone.',
        },
        {
            title: 'How Information is Collected',
            content: 'We employ various methods to collect information, including both active and passive means. Active collection occurs when you directly provide information by filling out forms, surveys, or interacting with our website and services.\n\nPassive collection involves the use of cookies, web beacons, and other tracking technologies to gather data about your browsing behavior, preferences, and device information. These technologies help us analyze website traffic, personalize content, and improve overall user experience. You have the option to manage cookie preferences through your browser settings.',
        },
        {
            title: 'Who Information is Shared With or Sold To',
            content: 'We prioritize the protection of your personal information and limit its disclosure to third parties. In certain cases, we may share information with trusted service providers who assist us in delivering our services and improving your user experience.\n\nThese parties are strictly bound by confidentiality agreements and are authorized to use the information only as necessary to perform their designated tasks. We do not sell your personal information to third parties for their own marketing purposes without your explicit consent. However, we may disclose information when required by law or to protect our legal rights, enforce our terms of service, or ensure the safety and security of our users.',
        },
        {
            title: 'What Rights Users Have Over Their Data',
            content: 'As a user, you have certain rights over your personal data. These rights may include the right to access and obtain a copy of your data, the right to rectify inaccurate information, the right to request the deletion of your data (subject to legal requirements), and the right to restrict or object to certain data processing activities.\n\nYou may also have the right to data portability and the right to withdraw your consent for data processing. To exercise these rights or learn more about them, please contact us using the contact details provided below. We will make every effort to fulfill your request in a timely manner and in accordance with applicable data protection laws.',
        },
        {
            title: "The Site's Contact Details",
            content: 'If you have any questions, concerns, or requests regarding our privacy practices or this Privacy Policy, please contact us using the following contact details:\n\n- Email: [contact email]\n- Phone: [contact phone number]\n\nOur privacy team is dedicated to addressing privacy-related inquiries and will respond to your communication as promptly as possible. We appreciate your trust in our services and are committed to safeguarding your privacy.',
        },
    ];

    return (
        <Container>
            <hr className='mt-3' />
            <h1 className='my-4'>Privacy policy</h1>
            <p className='mb-4'>
                This Privacy Policy describes how [Your Company Name] ("Company," "we," or "us") collects, uses, and discloses your personal information when you use [Your Project Name] ("Project" or "Website"). By accessing or using the Project, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
            <Accordion defaultActiveKey="0">
                { privacyBlocks.map((block, index) => (
                    <Accordion.Item eventKey={ index } key={ index }>
                        {/* <h3 className='text-grey my-4'>{ block.title }</h3> */ }
                        <Accordion.Header>
                            <h3 className='text-grey my-3'>{ block.title }</h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p className='mb-2'>{ block.content }</p>
                        </Accordion.Body>
                    </Accordion.Item>
                )) }
            </Accordion>
            <hr />
            <p>Please note that this is a sample document and may need to be reviewed and customized to accurately reflect your specific project and legal requirements.</p>
        </Container>
    );
};

export default PrivacyPolicyBlocks;
