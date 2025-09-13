import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentStats } from '@/components/StudentStats';
import { User, GraduationCap, Trophy, Heart, Camera, Save } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: 'João Silva',
    email: 'joao.silva@email.com',
    dateOfBirth: '2005-03-15',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    
    // Dados Acadêmicos
    school: 'Colégio São Paulo',
    academicYear: 2024,
    gpa: 3.8,
    satScore: 1200,
    actScore: 28,
    
    // Dados Esportivos
    sport: 'Futebol Americano',
    position: 'Quarterback',
    height: 185,
    weight: 85,
    jerseyNumber: 12,
    
    // Dados de Saúde
    bloodType: 'O+',
    allergies: 'Nenhuma',
    medications: 'Nenhuma',
    emergencyContact: 'Maria Silva - (11) 88888-8888',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aqui seria feita a chamada para a API
    console.log('Salvando dados:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Perfil do Atleta</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as informações pessoais, acadêmicas e esportivas
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Editar Perfil
            </Button>
          )}
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <StudentStats
        gpa={formData.gpa}
        height={formData.height}
        weight={formData.weight}
        jerseyNumber={formData.jerseyNumber}
        sport={formData.sport}
      />

      {/* Foto e Dados Básicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Informações Básicas
          </CardTitle>
          <CardDescription>
            Dados pessoais e de contato do atleta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            {/* Foto do Atleta */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2"
                    variant="outline"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <p className="font-medium">{formData.name}</p>
                <p className="text-sm text-muted-foreground">{formData.sport}</p>
                <p className="text-sm text-muted-foreground">#{formData.jerseyNumber}</p>
              </div>
            </div>

            {/* Formulário */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para diferentes seções */}
      <Tabs defaultValue="academic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="academic" className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-2" />
            Acadêmico
          </TabsTrigger>
          <TabsTrigger value="athletic" className="flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            Esportivo
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Saúde
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Emergência
          </TabsTrigger>
        </TabsList>

        {/* Tab Acadêmico */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Informações Acadêmicas</CardTitle>
              <CardDescription>
                Dados escolares e pontuações de testes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="school">Escola</Label>
                  <Input
                    id="school"
                    value={formData.school}
                    onChange={(e) => handleInputChange('school', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="academicYear">Ano Letivo</Label>
                  <Input
                    id="academicYear"
                    type="number"
                    value={formData.academicYear}
                    onChange={(e) => handleInputChange('academicYear', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="satScore">SAT Score</Label>
                  <Input
                    id="satScore"
                    type="number"
                    value={formData.satScore}
                    onChange={(e) => handleInputChange('satScore', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="actScore">ACT Score</Label>
                  <Input
                    id="actScore"
                    type="number"
                    value={formData.actScore}
                    onChange={(e) => handleInputChange('actScore', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Esportivo */}
        <TabsContent value="athletic">
          <Card>
            <CardHeader>
              <CardTitle>Informações Esportivas</CardTitle>
              <CardDescription>
                Dados específicos do esporte praticado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sport">Esporte</Label>
                  <Select
                    value={formData.sport}
                    onValueChange={(value) => handleInputChange('sport', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Futebol Americano">Futebol Americano</SelectItem>
                      <SelectItem value="Basquete">Basquete</SelectItem>
                      <SelectItem value="Futebol">Futebol</SelectItem>
                      <SelectItem value="Tênis">Tênis</SelectItem>
                      <SelectItem value="Natação">Natação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="position">Posição</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="jerseyNumber">Número da Camisa</Label>
                  <Input
                    id="jerseyNumber"
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => handleInputChange('jerseyNumber', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Saúde */}
        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Saúde</CardTitle>
              <CardDescription>
                Dados médicos e de saúde do atleta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => handleInputChange('bloodType', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="allergies">Alergias</Label>
                  <Input
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="medications">Medicamentos</Label>
                  <Input
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Emergência */}
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle>Contatos de Emergência</CardTitle>
              <CardDescription>
                Informações para situações de emergência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
