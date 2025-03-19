module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    // In-memory data store (in production, use Azure Cosmos DB or similar)
    let affirmations = [
        {
            id: '1',
            text: 'I believe in my abilities and trust my decisions.',
            createdAt: new Date().toISOString(),
            category: 'Confidence',
        },
        {
            id: '2',
            text: 'I am confident in my unique perspective and skills.',
            createdAt: new Date().toISOString(),
            category: 'Confidence',
        },
        {
            id: '3',
            text: 'I speak with conviction and others value my input.',
            createdAt: new Date().toISOString(),
            category: 'Confidence',
        },
        {
            id: '4',
            text: 'I face challenges with courage and unwavering belief in myself.',
            createdAt: new Date().toISOString(),
            category: 'Confidence',
        }
    ];
    
    // Handle GET request
    if (req.method === "GET") {
        // Filter by category if specified
        const category = req.query.category;
        if (category) {
            const filteredAffirmations = affirmations.filter(a => a.category.toLowerCase() === category.toLowerCase());
            context.res = {
                status: 200,
                body: filteredAffirmations,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return;
        }
        
        // Return all affirmations
        context.res = {
            status: 200,
            body: affirmations,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return;
    }
    
    // Handle POST request
    if (req.method === "POST") {
        const newAffirmation = req.body;
        
        // Validate request
        if (!newAffirmation || !newAffirmation.text || !newAffirmation.category) {
            context.res = {
                status: 400,
                body: "Please provide all required fields: text and category",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return;
        }
        
        // Create new affirmation
        const affirmation = {
            id: String(affirmations.length + 1),
            text: newAffirmation.text,
            createdAt: new Date().toISOString(),
            category: newAffirmation.category
        };
        
        // Add to collection
        affirmations.push(affirmation);
        
        context.res = {
            status: 201,
            body: affirmation,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return;
    }
    
    // Handle unsupported methods
    context.res = {
        status: 405,
        body: "Method not allowed",
        headers: {
            'Content-Type': 'application/json'
        }
    };
};