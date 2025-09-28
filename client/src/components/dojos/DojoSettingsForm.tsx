// src/components/dojos/DojoSettingsForm.tsx
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';

interface DojoSettings {
  id: number;
  dojoId: number;
  autoAttendanceReminders: boolean;
  reminderTimeBeforeSession?: number;
  notifyOnNewRegistration: boolean;
  notifyOnAttendanceChange: boolean;
  allowSelfRegistration: boolean;
  requireApprovalForJoin: boolean;
}

interface DojoSettingsFormProps {
  dojoId: number;
  onSave?: () => void;
}

const DojoSettingsForm: React.FC<DojoSettingsFormProps> = ({ dojoId, onSave }) => {
  const api = useApi<any>();
  const [settings, setSettings] = useState<DojoSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, [dojoId]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await api.callApi(`/dojos/${dojoId}/settings`);
      let data = response.data;
      if (!data) {
        data = {
          id: 0,
          dojoId,
          autoAttendanceReminders: false,
          notifyOnNewRegistration: true,
          notifyOnAttendanceChange: false,
          allowSelfRegistration: true,
          requireApprovalForJoin: false,
        };
      }
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to load settings');
      // Initialize with default settings if none exist
      setSettings({
        id: 0,
        dojoId,
        autoAttendanceReminders: false,
        notifyOnNewRegistration: true,
        notifyOnAttendanceChange: false,
        allowSelfRegistration: true,
        requireApprovalForJoin: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: keyof DojoSettings, value: any) => {
    if (settings) {
      setSettings({
        ...settings,
        [key]: value
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      if (settings?.id) {
        // Update existing settings
        await api.callApi(`/dojos/${dojoId}/settings`, {
            method: 'PUT',
            body: JSON.stringify({ settings }),
            });
      } else {
        await api.callApi(`/dojos/${dojoId}/settings`, {
            method: 'POST',
            body: JSON.stringify({ settings }),
            });
      }

      onSave?.();
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading settings...</div>;
  }

  if (!settings) {
    return <div className="error">Failed to load settings</div>;
  }

  return (
    <div className="dojo-settings-form">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="settings-sections">
        {/* Attendance Settings */}
        <div className="settings-section">
          <h4>📊 Attendance Settings</h4>
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.autoAttendanceReminders}
                onChange={(e) => handleSettingChange('autoAttendanceReminders', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Auto Attendance Reminders
            </label>
            {settings.autoAttendanceReminders && (
              <div className="setting-detail">
                <label>Remind before session (minutes):</label>
                <input
                  type="number"
                  value={settings.reminderTimeBeforeSession || 30}
                  onChange={(e) => handleSettingChange('reminderTimeBeforeSession', parseInt(e.target.value))}
                  min="5"
                  max="1440"
                />
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h4>🔔 Notification Settings</h4>
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.notifyOnNewRegistration}
                onChange={(e) => handleSettingChange('notifyOnNewRegistration', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Notify on new student registration
            </label>
          </div>
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.notifyOnAttendanceChange}
                onChange={(e) => handleSettingChange('notifyOnAttendanceChange', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Notify on attendance changes
            </label>
          </div>
        </div>

        {/* Registration Settings */}
        <div className="settings-section">
          <h4>👥 Registration Settings</h4>
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.allowSelfRegistration}
                onChange={(e) => handleSettingChange('allowSelfRegistration', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Allow self-registration
            </label>
          </div>
          <div className="setting-item">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={settings.requireApprovalForJoin}
                onChange={(e) => handleSettingChange('requireApprovalForJoin', e.target.checked)}
                disabled={!settings.allowSelfRegistration}
              />
              <span className="toggle-slider"></span>
              Require approval for new members
            </label>
            {!settings.allowSelfRegistration && (
              <small className="hint">Enable self-registration first</small>
            )}
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn btn-primary"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
        <button 
          onClick={fetchSettings}
          disabled={isSaving}
          className="btn btn-outline"
        >
          Reset Changes
        </button>
      </div>
    </div>
  );
};

export default DojoSettingsForm;