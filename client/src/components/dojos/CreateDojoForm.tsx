// src/components/dojos/CreateDojoForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';

interface CreateDojoFormProps {
  onSuccess: (dojo: any) => void;
  onCancel: () => void;
}

const CreateDojoForm: React.FC<CreateDojoFormProps> = ({ onSuccess, onCancel }) => {
    const api = useApi<any>();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        city: '',
        website: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.callApi('/dojos', {
            method: 'POST',
            body: JSON.stringify({
                ...formData,
                headCoachId: user?.id
            })
        });
        if (!response.ok) {
            throw new Error('Failed to create dojo');
        }

        const newDojo = await response.json();
        onSuccess(newDojo);
        } catch (err) {
        setError('Failed to create dojo. Please try again.');
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="create-dojo-form">
        <div className="form-header">
            <h2>Create Your Dojo</h2>
            <p>Set up your martial arts school to start managing students and classes</p>
        </div>

        {error && (
            <div className="alert alert-error">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className="form-grid">
            <div className="form-group">
                <label htmlFor="name">Dojo Name *</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Dragon Karate Academy"
                />
            </div>
            <div className="form-group">
                <label htmlFor="country">Country *</label>
                <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="e.g., United States"
                />
            </div>

            <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="e.g., New York"
                />
            </div>

            <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your dojo, teaching philosophy, etc."
                />
            </div>

            <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                />
            </div>
            </div>

            <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={isSubmitting}>
                Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Dojo...' : 'Create Dojo'}
            </button>
            </div>
        </form>
        </div>
    );
};

export default CreateDojoForm;