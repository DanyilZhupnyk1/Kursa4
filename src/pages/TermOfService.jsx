import { Container } from 'react-bootstrap';

const TermsOfServicePage = () => {
    const termsOfServiceBlocks = [
        {
            title: 'Description of Service',
            content: 'The Project provides [description of the services provided by your project].',
        },
        {
            title: 'Acceptance of Terms',
            content: 'By accessing or using the Project, you agree to these Terms and represent that you have the legal authority to enter into this agreement. If you do not agree to these Terms, you may not use the Project.',
        },
        {
            title: 'User Responsibilities',
            content: 'You agree to use the Project in compliance with all applicable laws and regulations. You are solely responsible for the content you submit and your interactions with other users of the Project.',
        },
        {
            title: 'Intellectual Property Rights',
            content: 'The Project and all related materials, including but not limited to software, logos, designs, and documentation, are the property of the Company and are protected by intellectual property laws. You may not modify, reproduce, distribute, or create derivative works of any materials from the Project without prior written consent from the Company.',
        },
        {
            title: 'Privacy',
            content: 'The Company respects your privacy and handles your personal information in accordance with its Privacy Policy. By using the Project, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.',
        },
        {
            title: 'Disclaimer of Warranties',
            content: `The Project is provided on an "as is" and "as available" basis. The Company makes no warranties, express or implied, regarding the Project's reliability, availability, or suitability for your particular purpose.`,
        },
        {
            title: 'Limitation of Liability',
            content: 'To the maximum extent permitted by law, the Company shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising out of or in connection with the use of the Project.',
        },
        {
            title: 'Indemnification',
            content: 'You agree to indemnify and hold the Company harmless from any claims, losses, liabilities, damages, costs, or expenses incurred in connection with your use of the Project or any violation of these Terms.',
        },
        {
            title: 'Modifications to Terms',
            content: 'The Company reserves the right to modify or update these Terms at any time. Any changes will be effective upon posting the revised Terms on the Project. It is your responsibility to review the Terms periodically.',
        },
        {
            title: 'Governing Law',
            content: 'These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or relating to these Terms or the Project shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].',
        },
    ];

    return (
        <Container>
            <hr className='mt-3' />
            <h1 className='my-4'>Terms of Service</h1>
            <p className='mb-4'>{ `These Terms of Service ("Terms") govern your use of the services provided by [Your Company Name] ("Company") for [Your Project Name] ("Project"). By accessing or using the Project, you agree to be bound by these Terms.` }</p>
            { termsOfServiceBlocks.map((block, index) => (
                <div key={ index }>
                    <h3 className='text-grey my-4'>{ index + 1 }.{ block.title }</h3>
                    <p className='mb-5'>{ block.content }</p>
                </div>
            )) }
            <hr />
            <p>Please note that this is a sample document and may need to be reviewed and customized to accurately reflect your specific project and legal requirements.</p>
        </Container>
    );
};

export default TermsOfServicePage;
